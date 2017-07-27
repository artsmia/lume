## user
- id
- email
- password
- groupIds
- itemIds
- organizationIds

## organization
- id
- name
- memberIds


## item
- id
- type
- json


## itemExtended
- id
- groupId
- json


## group
- id
- title
- json
- itemExtendedIds
- featureIds
- groupTypeId


## groupType
- id
- title
- jsonGroupSchema
- jsonItemExtendedSchema


## feature
- id
- title
- type
- json
- groupId
- featureTypeId

## featureType
- id
- title
- jsonFeatureSchema
- featureId
