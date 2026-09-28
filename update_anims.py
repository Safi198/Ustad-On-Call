import re

file_path = "src/app/pages/Home.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Increase initial movement distance for slower, longer reveal
content = re.sub(r'y:\s*20\s*}', 'y: 40 }', content)
content = re.sub(r'y:\s*30\s*}', 'y: 50 }', content)
content = re.sub(r'x:\s*20\s*}', 'x: 40 }', content)

# Increase duration for smoother, slower reveal
content = re.sub(r'duration:\s*0\.5\s*}', 'duration: 1.0 }', content)
content = re.sub(r'duration:\s*0\.5\s*,', 'duration: 1.0,', content)
content = re.sub(r'duration:\s*0\.6\s*}', 'duration: 1.0 }', content)
content = re.sub(r'duration:\s*0\.6\s*,', 'duration: 1.0,', content)
content = re.sub(r'duration:\s*0\.4\s*}', 'duration: 0.8 }', content)
content = re.sub(r'duration:\s*0\.4\s*,', 'duration: 0.8,', content)

# For elements that are too fast, let's also increase delay slightly (Optional, but let's stick to duration mostly)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Animations updated successfully!")
