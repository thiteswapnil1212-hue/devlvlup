import httpx

url = 'http://127.0.0.1:5000/analyze/octocat'

try:
    resp = httpx.get(url, timeout=20)
    print('status', resp.status_code)
    print(resp.text[:1000])
except Exception as exc:
    print('error', exc)
