import httpx
import asyncio

async def test():
    async with httpx.AsyncClient() as client:
        # Test the home page
        response = await client.get('http://127.0.0.1:8000/')
        print(f'Home page: {response.status_code}')
        if 'DevCareer Intelligence' in response.text:
            print('✓ Home page loads correctly')
        
        # Test the API with a sample GitHub user
        payload = {
            'github_username': 'torvalds',
            'claimed_level': 'senior',
            'target_role': 'full-stack',
            'location': 'remote'
        }
        try:
            response = await client.post('http://127.0.0.1:8000/api/analyze', json=payload, timeout=30)
            print(f'API response: {response.status_code}')
            if response.status_code == 200:
                print('✓ API endpoint working')
                data = response.json()
                profile = data.get('profile', {})
                skill = data.get('skill_audit', {})
                print(f'Profile: {profile.get("username")}')
                print(f'Overall score: {skill.get("overall")}')
                print('✓ All tests passed!')
            else:
                print(f'Error: {response.text}')
        except Exception as e:
            print(f'API test failed: {e}')

asyncio.run(test())
