import boto3
import os
import sys
import uuid
from PIL import Image
import PIL.Image

s3_client = boto3.client('s3')


def lambda_handler(event, context):

    print('starting...')

    for record in event['Records']:

        bucket = record['s3']['bucket']['name']

        key = record['s3']['object']['key']

        s3Dir = key.rstrip('/original.jpeg')

        download_path = '/tmp/original.jpeg'

        s3_client.download_file(bucket, key, download_path)

        o = Image.open(download_path)

        w = o.size[0]
        h = o.size[1]

        ratio = w / 200

        sw = int(w / ratio)
        sh = int(h / ratio)

        sPath = '/tmp/s.jpeg'

        o.resize((sw, sh)).save(sPath, 'JPEG')

        sKey = f"{s3Dir}/s.jpeg"

        s3_client.upload_file(sPath, bucket, sKey)

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
            return f"{loops}_{x}_{y}.jpeg"

        while w > tileSize < h:

            xMax = int(w / 512)
            yMax = int(h / 512)

            for x in range(0, xMax):

                box = makeBox(x,y)
                name = makeName(x,y)
                path = f"/tmp/{name}"
                key = f"{s3Dir}/{name}"
                o.crop(box).save(path, "JPEG")
                s3_client.upload_file(path, bucket, key)

                for y in range(0, yMax):

                    box = makeBox(x,y)
                    name = makeName(x,y)
                    path = f"/tmp/{name}"
                    key = f"{s3Dir}/{name}"
                    o.crop(box).save(path, "JPEG")
                    s3_client.upload_file(path, bucket, key)

            w = int(w / 2)
            h = int(h / 2)
            o = o.resize((w,h))
            loops = loops + 1

        name = makeName(x,y)
        path = f"/tmp/{name}"
        key = f"{s3Dir}/{name}"
        o.save(path, "JPEG")
        s3_client.upload_file(path, bucket, key)
