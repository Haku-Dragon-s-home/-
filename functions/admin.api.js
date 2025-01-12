export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}

	if (!m) {return Response.json(r)}
	var body = await context.request.json()

	// 登录
	if (m == "0" && body.key) {
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

	// 修改密码
	if (m == "1" && body.old && body.new) {
		var key = await context.env.MetaDB.prepare('SELECT * from root where data="adminKey"').first()
		var key = key.content
		if (body.old == key) {
			r = await context.env.MetaDB.prepare('UPDATE root set content=? where data="adminKey"').bind(body.new).all()
			r.msg = "change key"
		}
	}

	// 执行 SQL 命令
	if (m == "2" && body.key && body.sql) {
		var key = await context.env.MetaDB.prepare('SELECT * from root where data="adminKey"').first()
		var key = key.content
		if (body.key == key) {
			r = await context.env.MetaDB.prepare(sql).all()
			r.msg = null
		}
	}

	return Response.json(r)

}

