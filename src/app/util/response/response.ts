enum DAOResponse {
  SUCCESS = "DAO_SUCCESS_00",
  INVALID_REQUEST_PARAMETER = "DAO_ERROR_01",
  INVALID_EMAIL = "DAO_ERROR_02",
  INVALID_ID = "DAO_ERROR_03",
  INVALID_CREDENTIALS = "DAO_ERROR_04",
  USER_NOT_FOUND = "DAO_ERROR_05",
  DATA_NOT_FOUND = "DAO_ERROR_06",
  EMAIL_IS_EMPTY = "DAO_ERROR_07",
  FIRST_NAME_EMPTY = "DAO_ERROR_08",
  USER_ROLE_VO_EMPTY = "DAO_ERROR_09",
  EMAIL_ALREADY_EXIST = "DAO_ERROR_10",
  INVALID_FROMDATE = "DAO_ERROR_11",
  INVALID_TODATE = "DAO_ERROR_12",
  INVALID_CODE = "DAO_ERROR_13",
  INVALID_CURRENCY = "DAO_ERROR_14",
  COMM_INVALID_TYPE = "DAO_ERROR_15",
  COMM_DUPLICATE_CODE = "DAO_ERROR_16",
  INVALID_TRANSACTION_COUNT = "DAO_ERROR_17",
  INVALID_SLABS = "DAO_ERROR_18",
  LOYALTY_INVALID_TYPE = "DAO_ERROR_19",
  LOYALTY_DUPLICATE_CODE = "DAO_ERROR_20",
  APM_COMM_DUPLICATE_CODE = "DAO_ERROR_21",
  INVALID_CONV_CURRENCY = "DAO_ERROR_22",
  COUNTRY_DUPLICATE_CODE = "DAO_ERROR_23",
  CODE_ALREADY_EXIST = "DAO_ERROR_35",
  INVALID_REQUEST = "DAO_ERROR_97",
  UNKNOWN_ERROR = "DAO_ERROR_98",
  SYSTEM_ERROR="DAO_ERROR_99",
}

export {DAOResponse};
