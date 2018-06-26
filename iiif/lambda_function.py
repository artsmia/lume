import boto3
import os
import sys
import uuid
from PIL import Image
import PIL.Image
import json
import base64
from io import BytesIO

s3_client = boto3.client('s3')

def lambda_handler(event, context):

    print(json.dumps(event))

    params = event['params']['path']

    qualForm = params['qualForm'].split('.')
    rawRotation = params['rotation']


    if rawRotation[0] == '!':
        reflectAcrossY = True
        rotation = int(float(rawRotation[1:]))
    else:
        reflectAcrossY = False
        rotation = int(float(rawRotation))
    id = params['identifier']
    region = params['region']
    size = params['size']
    quality = qualForm[0]
    format = qualForm[1]

    originalPath = "/tmp/original.jpeg"

    s3_client.download_file('mia-lume', f"{id}/original.jpeg", originalPath)

    image = Image.open(originalPath)


    output = BytesIO()
    image.save(output, format='PNG')

    imageString = output.getvalue()

    output.close()

    # newPath = f"/tmp/{id}.jpeg"
    #
    # image.save(fp=newPath)

    # with open(newPath, 'rb') as imageFile:
    #     encoded = base64.b64encode(imageFile.read())


    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'image/png'
        },
        'isBase64Encoded': True,
        'body': f"{imageString}"
        # 'body': 'yo'
    }
