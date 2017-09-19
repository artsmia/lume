export function validateUuid(uuid){
  let resp = {
    errors: []
  }


  if (typeof uuid !== "string") {
    resp.errors.push(new Error("uuid must be a string"))
  }
  if (uuid.length !== 36) {
    resp.errors.push(new Error("uuid must be 36 characters long"))
  }

  if (resp.errors.length > 0) {
    resp.error = true
  } else {
    resp.error = false
  }

  return resp
}
