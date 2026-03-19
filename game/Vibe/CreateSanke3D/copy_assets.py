import shutil
import os

# Define absolute paths
src_dir = r"C:/Users/Admin/.gemini/antigravity/brain/6b775959-e9ba-4f51-858f-786f5fa88f19"
dest_dir = r"d:/error404-labs/game/Vibe/CreateSanke3D/assets"

# Mapping of source generated names to target names
mapping = {
    "ai_snake_1_premium_1773933933489.png": "ai_snake_1.png",
    "ai_snake_2_premium_1773933959005.png": "ai_snake_2.png",
    "ai_snake_3_premium_1773933978262.png": "ai_snake_3.png"
}

# Create destination if missing
if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)
    print(f"Created directory: {dest_dir}")

# Copy files
for src_name, dest_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {src_name} to {dest_name}")
    else:
        print(f"Source file not found: {src_path}")

print("Asset restoration complete.")
