#!/usr/bin/env python3
"""Upload explicitly approved Academy MP4s from a local review ZIP to PRIVATE Supabase storage.

Usage:
  python scripts/upload_approved_academy_videos.py --bundle GGS_Academy_20_Lessons_Review_Bundle.zip --approved approved_episodes.txt --dry-run
  python scripts/upload_approved_academy_videos.py --bundle ... --approved ... --upload

Environment (for --upload): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
approved_episodes.txt: one approved EPxx per line, reviewed and signed off by an authorized editor.
The script does NOT publish any lesson or insert video metadata. Never commit service keys.
"""
import argparse
import hashlib
import json
import os
import re
import sys
import urllib.error
import urllib.request
import zipfile

BUCKET = "ggs-academy-private-videos"

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bundle", required=True)
    parser.add_argument("--approved", required=True)
    action = parser.add_mutually_exclusive_group(required=True)
    action.add_argument("--dry-run", action="store_true")
    action.add_argument("--upload", action="store_true")
    args = parser.parse_args()

    with open(args.approved, encoding="utf-8") as handle:
        episodes = [x.strip() for x in handle if x.strip() and not x.lstrip().startswith("#")]
    if not episodes or len(episodes) != len(set(episodes)) or any(not re.fullmatch(r"EP(?:0[1-9]|1[0-9]|20)", e) for e in episodes):
        parser.error("Provide unique explicitly approved EP01–EP20 episode IDs, one per line.")

    base = os.environ.get("SUPABASE_URL", "").rstrip("/")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if args.upload and (not base.startswith("https://") or not key):
        parser.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before uploading.")

    with zipfile.ZipFile(args.bundle) as archive:
        manifest = {row["episode"]: row for row in json.loads(archive.read("manifest.json"))}
        for ep in episodes:
            row = manifest.get(ep)
            if not row:
                raise ValueError(f"{ep} missing from manifest")
            payload = archive.read(f"videos/{ep}.mp4")
            actual = hashlib.sha256(payload).hexdigest()
            if actual != row["sha256"] or len(payload) != row["size_bytes"]:
                raise ValueError(f"{ep} failed checksum/size validation")
            path = f"approved/{ep}.mp4"
            if args.dry_run:
                print(f"VALIDATED (not uploaded): {ep} -> {BUCKET}/{path}, {len(payload)} bytes")
                continue
            url = f"{base}/storage/v1/object/{BUCKET}/{path}"
            req = urllib.request.Request(url, data=payload, method="POST", headers={
                "Authorization": f"Bearer {key}",
                "apikey": key,
                "Content-Type": "video/mp4",
                "x-upsert": "false",
                "Cache-Control": "no-cache"
            })
            try:
                with urllib.request.urlopen(req, timeout=180) as response:
                    print(f"UPLOADED: {ep} HTTP {response.status}")
            except urllib.error.HTTPError as exc:
                print(f"FAILED {ep}: HTTP {exc.code} — {exc.read(250).decode('utf-8','replace')}", file=sys.stderr)
                sys.exit(1)
    print("Done. No video was published in Academy database. Review and attach metadata separately.")

if __name__ == "__main__":
    main()
