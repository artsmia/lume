        print('hello')
        bucket = record['s3']['bucket']['name']
        print(bucket)
        key = record['s3']['object']['key']
        print(key)

        download_path = f"/tmp/{key}"

        s3_client.download_file(bucket, key, download_path)

        print("downloaded?")


        download_path = f"/tmp/{key}"
        upload_path = f"/tmp/{key}".rstrip('/original.jpeg')
        print(download_path, upload_path)

        s3_client.download_file(bucket, key, download_path)

        print("downloaded?")

        o = Image.open(download_path)
        o.resize(100,100)
        o.save(upload_path, "JPEG")

        print("saved?")


        s3_client.upload_file(upload_path, bucket, key)

        print("done?")



sw = int(h / sRatio)

sh = int(w / sRatio)

s = o.resize(( sw, sh ))

s.save('smallcat.jpeg', 'jpeg')

tileSize = 512

loops = 0

x = 0
y = 0

def makeBox(x, y):
    w = tileSize * x
    n = tileSize * y
    e = tileSize * (x + 1)
    s = tileSize * (y + 1)
    return (w, n, e, s)

def makeName(x, y):
    return f"tiles/{loops}_{x}_{y}.jpeg"


while w > tileSize < h:

    print('w,h', w,h)
    xMax = int(w / 512)
    print('xMax', xMax)
    yMax = int(h / 512)
    print('yMax', yMax)

    for x in range(0, xMax):

        box = makeBox(x,y)

        tile = o.crop(box)

        name = makeName(x,y)

        tile.save(name, "JPEG")

        for y in range(0, yMax):

            box = makeBox(x,y)

            tile = o.crop(box)

            name = makeName(x,y)

            tile.save(name, "JPEG")

    w = int(w / 2)
    h = int(h / 2)
    o = o.resize((w,h))
    loops = loops + 1

name = makeName(x,y)
o.save(name, "JPEG")
