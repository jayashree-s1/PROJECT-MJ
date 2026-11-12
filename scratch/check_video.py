import struct

def get_mp4_info(filepath):
    with open(filepath, 'rb') as f:
        data = f.read(100000)
    # search for tkhd
    pos = data.find(b'tkhd')
    if pos != -1:
        # width and height are at pos + 76 and pos + 80 in 32-bit fixed point (version 0)
        version = data[pos+4]
        offset = 84 if version == 1 else 76
        width = struct.unpack('>I', data[pos+offset:pos+offset+4])[0] / 65536.0
        height = struct.unpack('>I', data[pos+offset+4:pos+offset+8])[0] / 65536.0
        print(f"Video resolution: {width} x {height}")
    else:
        print("tkhd box not found in initial bytes")

get_mp4_info(r"c:\Users\senth\OneDrive\Desktop\mj\public\media\our-favourite-moment.mp4")

