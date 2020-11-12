# Dynamic UI service

Rest API for dynamic screen management
1. Create endpoint /get-meta-data, it will take the input from user module_name and screen_name as path parameter or body or query string.

# Assumptions:
Assume there is a folder structure present in the server-side as below.
public
|
 src
   |
    ui-config
             |
              specification
                          |
                          finance
                          tradelicense

# Main challenge:
 Dynamically reading the file

# APIs to expose
GET
/get_meta_data/{module}/{screen}
Response:
Type: JSON

Example:
# http://localhost:8000/v1/get-meta-data/finance/collect
Response:
{
    "searchApllicationId": {
        "type": "Textfield",
        "props": {
            "label": "application id",
            "required": true
        }
    }
}
Status: 200

# http://localhost:8000/v1/get-meta-data/tradelicense/apply
Response:
{
    "applytradeName": {
        "type": "Textfield",
        "props": {
            "label": "trade name",
            "required": true
        }
    },
    "applyTradeType": {
        "type": "Select",
        "props": {
            "label": "trade type",
            "option": [
                {
                    "name": "goods",
                    "code": "goods"
                }
            ]
        }
    }
}
Status: 200