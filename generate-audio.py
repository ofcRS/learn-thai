import asyncio
import edge_tts
import os

VOICE = "th-TH-PremwadeeNeural"
OUT_DIR = "public/audio"

# Consonants: (filename, Thai word to speak)
consonants = [
    ("c-ก", "ไก่"),
    ("c-ข", "ไข่"),
    ("c-ฃ", "ขวด"),
    ("c-ค", "ควาย"),
    ("c-ฅ", "คน"),
    ("c-ฆ", "ระฆัง"),
    ("c-ง", "งู"),
    ("c-จ", "จาน"),
    ("c-ฉ", "ฉิ่ง"),
    ("c-ช", "ช้าง"),
    ("c-ซ", "โซ่"),
    ("c-ฌ", "เฌอ"),
    ("c-ญ", "หญิง"),
    ("c-ฎ", "ชฎา"),
    ("c-ฏ", "ปฏัก"),
    ("c-ฐ", "ฐาน"),
    ("c-ฑ", "มณโฑ"),
    ("c-ฒ", "ผู้เฒ่า"),
    ("c-ณ", "เณร"),
    ("c-ด", "เด็ก"),
    ("c-ต", "เต่า"),
    ("c-ถ", "ถุง"),
    ("c-ท", "ทหาร"),
    ("c-ธ", "ธง"),
    ("c-น", "หนู"),
    ("c-บ", "ใบไม้"),
    ("c-ป", "ปลา"),
    ("c-ผ", "ผึ้ง"),
    ("c-ฝ", "ฝา"),
    ("c-พ", "พาน"),
    ("c-ฟ", "ฟัน"),
    ("c-ภ", "สำเภา"),
    ("c-ม", "ม้า"),
    ("c-ย", "ยักษ์"),
    ("c-ร", "เรือ"),
    ("c-ล", "ลิง"),
    ("c-ว", "แหวน"),
    ("c-ศ", "ศาลา"),
    ("c-ษ", "ฤๅษี"),
    ("c-ส", "เสือ"),
    ("c-ห", "หีบ"),
    ("c-ฬ", "จุฬา"),
    ("c-อ", "อ่าง"),
    ("c-ฮ", "นกฮูก"),
]

# Vowels: (filename, Thai example word)
vowels = [
    ("v-ะ", "กับ"),
    ("v-า", "บ้า"),
    ("v-ำ", "น้ำ"),
    ("v-ใ", "ใส่"),
    ("v-ไ", "ไทย"),
    ("v-ิ", "คิด"),
    ("v-ี", "อีก"),
    ("v-ึ", "ลึก"),
    ("v-ื", "ชื่อ"),
    ("v-ุ", "คุก"),
    ("v-ู", "ปู"),
    ("v-เา", "เรา"),
    ("v-เะ", "เตะ"),
    ("v-เ", "เพลง"),
    ("v-แะ", "แกะ"),
    ("v-แ", "แดง"),
    ("v-โะ", "โต๊ะ"),
    ("v-โ", "โชค"),
    ("v-เาะ", "เกาะ"),
    ("v-อ", "พ่อ"),
    ("v-เอะ", "เยอะ"),
    ("v-เอ", "เผลอ"),
    ("v-เียะ", "เดี๊ยะ"),
    ("v-เีย", "เมีย"),
    ("v-เือะ", "เอือะ"),
    ("v-เือ", "เรือ"),
    ("v-ัวะ", "ผลัวะ"),
    ("v-ัว", "ตัว"),
    ("v-ฤ", "ฤดู"),
    ("v-ฤๅ", "ฤๅษี"),
]

all_words = consonants + vowels

async def generate(filename, text):
    out = os.path.join(OUT_DIR, f"{filename}.mp3")
    comm = edge_tts.Communicate(text, VOICE, rate="-20%")
    await comm.save(out)
    print(f"  {filename}.mp3 <- {text}")

async def main():
    print(f"Generating {len(all_words)} audio files...")
    for filename, text in all_words:
        await generate(filename, text)
    print("Done!")

asyncio.run(main())
