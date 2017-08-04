export default async function(e) {
  try {
    const file = e.target.files[0]

    let data = new FormData()
    data.append('file', file)

    const resp = await fetch("http://localhost:5000/image",{
      method: "POST",
      body: data
    })

    const json = await resp.json()

    console.log(json)

  } catch (ex) {
    console.error(ex)
  }
}

        // <input
        //   type={"file"}
        //   name={"myPic"}
        //   accept={"image/*"}
        //   onChange={handleChange}
        // />
        //
