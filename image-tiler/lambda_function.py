import boto3
import os
import sys
import uuid
from PIL import Image
import PIL.Image
import json

s3_client = boto3.client('s3')



def lambda_handler(event, context):

    print('starting...')

    for record in event['Records']:

        bucket = record['s3']['bucket']['name']

        key = record['s3']['object']['key']

        print(record['s3']['object']['key'])

        s3Dir = key.replace('/original.jpeg', '')

        download_path = '/tmp/original.jpeg'

        s3_client.download_file(bucket, key, download_path)

        o = Image.open(download_path)

        w = o.size[0]
        h = o.size[1]

        info = {
            'width': w,
            'height': h,
        }

        infoPath = '/tmp/info.json'

        with open(infoPath, "w+") as outfile:
            json.dump(info,outfile)

        s3_client.upload_file(infoPath, bucket, f"{s3Dir}/info.json", ExtraArgs={'ACL':'public-read'})

        ratio = w / 200

        sw = int(w / ratio)
        sh = int(h / ratio)

        sPath = '/tmp/s.png'

        o.resize((sw, sh)).save(sPath, 'PNG')

        sKey = f"{s3Dir}/s.png"

        s3_client.upload_file(sPath, bucket, sKey, ExtraArgs={'ACL':'public-read'})

        ratio = w / 400

        mw = int(w / ratio)
        mh = int(h / ratio)

        mPath = '/tmp/m.png'

        o.resize((mw, mh)).save(mPath, 'PNG')

        mKey = f"{s3Dir}/m.png"

        s3_client.upload_file(mPath, bucket, mKey, ExtraArgs={'ACL':'public-read'})

        tileSize = 512

        tempW = w
        tempH = h

        z = 0

        while tempW > tileSize or tempH > tileSize:
            tempW = int(tempW / 2)
            tempH = int(tempH / 2)
            z = z + 1


        x = 0
        y = 0

        def makeBox(x, y):
            w = tileSize * x
            n = tileSize * y
            e = tileSize * (x + 1)
            s = tileSize * (y + 1)

            if e > o.size[0]:
                e = o.size[0]

            if s > o.size[1]:
                s = o.size[1]

            box = (w, n, e, s)

            return box

        def makeName(x, y):
            name = f"{z}_{x}_{y}.png"
            return name



        while z > 0:

            xMax = int(w / 512) + 1
            yMax = int(h / 512) + 1

            for x in range(0, xMax):

                for y in range(0, yMax):

                    box = makeBox(x, y)

                    if box[0] < o.size[0] and box[1] < o.size[1]:
                        name = makeName(x,y)
                        path = f"/tmp/{name}"
                        key = f"{s3Dir}/{name}"
                        o.crop(box).save(path, "PNG")
                        s3_client.upload_file(path, bucket, key, ExtraArgs={'ACL':'public-read'})

            w = int(w / 2)
            h = int(h / 2)
            o = o.resize((w,h))
            z = z - 1

        name = makeName(0,0)
        path = f"/tmp/{name}"
        key = f"{s3Dir}/{name}"
        o.save(path, "PNG")
        s3_client.upload_file(path, bucket, key, ExtraArgs={'ACL':'public-read'})
