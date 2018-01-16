{identifier}/{region}/{size}/{rotation}/{quality}.{format}


def main(event, context, callback):
    p = context['pathParameters']

    size = p['size']
    rotation = p['rotation']
    quality = p['quality']
    formate = p['format']
