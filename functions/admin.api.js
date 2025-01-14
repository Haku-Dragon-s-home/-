export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}

	if (!m) {return Response.json(r)}

	// 登录
	if (m == "0") {
		var body = await context.request.json()
		if (!body.key) {return Response.json(r)}

		var key = await context.env.MetaDB.prepare('SELECT * from root where data="adminKey"').first()
		var key = key.content
		r.success = true
		r.msg = null
		if (body.key == key) {
			r.results.push({"login": 1})
		} else {
			r.results.push({"login": 0})
		}
	}

	// 执行 SQL 命令
	if (m == "1") {
		var body = await context.request.json()
		if (!body.key || !body.sql) {return Response.json(r)}

		var key = await context.env.MetaDB.prepare('SELECT * from root where data="adminKey"').first()
		var key = key.content
		if (body.key == key) {
			r = await context.env.MetaDB.prepare(body.sql).all()
			r.msg = null
		}
	}

	// 文件上传
	if (m == "2") {
		var body = await context.request.arrayBuffer()
		var i = context.request.headers.get('Authorization')

		r.msg = {chunk: i}
		await context.env.MetaDB.prepare('UPDATE file set data=? where name=?').bind(body, "c" + i).all()
	}


	return Response.json(r)

}

