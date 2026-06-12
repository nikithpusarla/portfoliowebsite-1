import urllib.request
import re

url = "https://www.youtube.com/watch?v=UvYEXVfCScA"
try:
    html = urllib.request.urlopen(url).read().decode('utf-8')
    m = re.search(r'"lengthSeconds":"(\d+)"', html)
    if m:
        print("DURATION:", m.group(1))
    else:
        print("DURATION: Not found")
except Exception as e:
    print("Error:", e)
