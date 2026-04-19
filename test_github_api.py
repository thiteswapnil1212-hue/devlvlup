import httpx
import asyncio

async def test():
    async with httpx.AsyncClient() as client:
        payload = {
            'github_username': 'swapnil1212',
            'claimed_level': 'mid',
            'target_role': 'full-stack',
            'location': 'remote'
        }
        try:
            response = await client.post('http://127.0.0.1:8000/api/analyze', json=payload, timeout=30)
            print(f'Status: {response.status_code}')
            if response.status_code == 200:
                data = response.json()
                print('✓ API working with GitHub token!')
                print(f'Profile: {data["profile"]["username"]}')
                print(f'Overall score: {data["skill_audit"]["overall"]}')
            else:
                print(f'Error: {response.text}')
        except Exception as e:
            print(f'Error: {e}')

asyncio.run(test())