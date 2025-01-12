export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}
	if (!m) {return Response.json(r)}

	var body = await context.request.json()





	// 登录
	if (m == "0" && body.key) {
		var key = await context.env.MetaDB.prepare('SELECT * from root where data="adminKey"').first()
		var key = key['content']

		r.success = true
		r.msg = null
		if (key == body.key) {
			r.results.push({"login": 1})
		} else {
			r.results.push({"login": 0})
		}
	}

	return Response.json(r)

}

