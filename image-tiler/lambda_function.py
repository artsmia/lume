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

        ow = o.size[0]
        oh = o.size[1]

        print(o.size)

        ratio = ow / 200

        sw = int(ow / ratio)
        sh = int(oh / ratio)

        print(sw,sh)

        sPath = '/tmp/s.jpeg'

        o.resize((sw, sh)).save(sPath, 'JPEG')

        sKey = f"{s3Dir}/s.jpeg"

        print(sKey)

        print(os.listdir('/tmp'))

        s3_client.upload_file(sPath, bucket, sKey)
