export default async (req, res, next) => {
  try {

    console.log("apphook", req.body)

  } catch (ex) {
    console.error(ex)
  }
}
