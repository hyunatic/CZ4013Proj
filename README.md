# CZ4013 - Distributed-banking-system
## Assignment 1

This project consolidates basic knowledge about interprocess communication and remote invocation through constructing client and server programs that use TCP transport to simulate the UDP "request and reply" function. 

## Project Members
- Aide Iskandar (hyunatic)
- Lee Hong Ying (Aoi-00)
- Brendan (yeo040294)

## Programming Language / Framework Used
- Client Side: React JS (ES6)
- Server Side: Node JS (ES5)
- Socket-IO
- MDBBootstrap

## Installation

CZ4013 Distributed Banking System requires [Node.js](https://nodejs.org/) v16+ to run.

Install the node packages and start the server.

```sh
cd CZ4013Proj/server
npm install 
node server.js
```

Install the node packages and start the client.

```sh
cd CZ4013Proj/client
npm install 
npm start
http://localhost:2222
```

## Supported Service

### Login

#### Request
| Params   | Type         |
| -------- | ------------ |
| Name     | ```String``` |
| Password | ```String``` |

#### Response
| Params         | Type      |
| -------------- | --------- |
| AccountNo | ```int```    |
| AccountName   | ```String``` |
| Password | ```String``` |
| Currency | ```String``` |
| Balance  | ```float```  |

### Open New Account

#### Request
| Params   | Type         |
| -------- | ------------ |
| AccountNo | ```int```    |
| AccountName   | ```String``` |
| Password | ```String``` |
| Currency | ```String``` |
| Balance  | ```float```  |

#### Response
| Params         | Type      |
| -------------- | --------- |
| Account Number | ```int``` |


### Close Existing Account

#### Request
| Params         | Type         |
| -------------- | ------------ |
| Name           | ```String``` |
| Account Number | ```int```    |
| Password       | ```String``` |

#### Response
| Params | Type          |
| ------ | ------------- |
| Server-Response | ```string``` |


### Deposit/Withdraw Money

#### Request
| Params         | Type         |
| -------------- | ------------ |
| Name           | ```String``` |
| AccountNo      | ```int```    |
| AccountName    | ```String``` |
| Password       | ```String``` |
| Currency       | ```int```    |
| Amount         | ```float```  |
| Mode           | ```int```  |

#### Response
| Params   | Type        |
| -------- | ----------- |
| AccountNo | ```int```    |
| AccountName | ```String``` |
| Password | ```String``` |
| Currency | ```String``` |
| Balance  | ```float```  |

### Monitor Updates

#### Request
| Params   | Type      |
| -------- | --------- |
| Duration | ```int``` |

#### Response
| Params | Type          |
| ------ | ------------- |
| AccountNo | ```int```    |
| AccountName   | ```String``` |
| Password | ```String``` |
| Currency | ```String``` |
| Balance  | ```float```  |
| Function  | ```String```  |


### Transfer Money

#### Request
| Params                   | Type         |
| ------------------------ | ------------ |
| Name           | ```String``` |
| AccountNo      | ```int```    |
| AccountName    | ```String``` |
| Password       | ```String``` |
| Currency       | ```int```    |
| Amount         | ```float```  |
| Mode           | ```int```  |
| ReceipientAccountNo | ```int```    |
| ReceipientName | ```string```    |
| Balance                  | ```float```  |
| Mode           | ```int```  |

#### Response
| Params   | Type        |
| -------- | ----------- |
| AccountNo | ```int```    |
| AccountName   | ```String``` |
| Password | ```String``` |
| Currency | ```String``` |
| Balance  | ```float```  |



## License
MIT

**Finally Graduating NTU liao!**