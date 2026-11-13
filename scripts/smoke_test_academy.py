#!/usr/bin/env python3
"""Read-only authenticated Academy API smoke test.

Use with a short-lived access token obtained from an existing surveyor account.
Do not paste tokens into chat or commit them. Set GGS_BASE_URL and GGS_TEST_ACCESS_TOKEN
in a local shell, then run: python scripts/smoke_test_academy.py
No production rows are created or modified.
"""
import json
import os
import urllib.error
import urllib.request

base = os.environ.get("GGS_BASE_URL", "").rstrip("/")
token = os.environ.get("GGS_TEST_ACCESS_TOKEN", "")
if not base.startswith("https://") or not token:
    raise SystemExit("Set HTTPS GGS_BASE_URL and GGS_TEST_ACCESS_TOKEN locally.")
def check(path, expected, method="GET", body=None, auth=None):
    headers = {"Content-Type": "application/json"}
    if auth: headers["Authorization"] = f"Bearer {auth}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(base + path, method=method, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            status, payload = r.status, r.read(2000)
    except urllib.error.HTTPError as e:
        status, payload = e.code, e.read(2000)
    ok = status in expected
    print(("PASS" if ok else "FAIL"), path, status, "expected", sorted(expected))
    if not ok: print(payload.decode("utf-8", "replace")[:300])
    return ok
results = [
    check("/api/academy/progress", {401}),
    check("/api/academy/progress", {200}, auth=token),
    check("/api/academy/video", {401}, "POST", {"videoId": "00000000-0000-4000-8000-000000000001"}),
    check("/api/academy/video", {404}, "POST", {"videoId": "00000000-0000-4000-8000-000000000001"}, token),
    check("/api/academy/video", {400}, "POST", {"videoId": "invalid"}, token),
]
if not all(results):
    raise SystemExit("Smoke test failed: do NOT deploy.")
print("Read-only API smoke tests passed. Video playback, progress insert and browser login require separate manual verification.")
