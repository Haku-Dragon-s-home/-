export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}

	if (!m) {return Response.json(r)}
	var body = await context.request.json()

	// 删除留言
	if (m == "0") {
		var now = new Date()
		var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
		var formatter = new Intl.DateTimeFormat('en-US', options)
		var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')

		if ((parseInt(body.id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000) > parseInt(id)) {
			await context.env.MetaDB.prepare('DELETE FROM pool WHERE op = 0 and id = ?').bind(body.id).first()
			await context.env.MetaDB.prepare('UPDATE root set data=data-1 where name="comment"').first()

			r.success = true
			r.msg = {delete: id}
		}
	}

	// 添加留言
	if (m == "1") {
		if (body.content.length > 200 || body.name.length > 20) {return Response.json(r)}

		// 生成一个 id
		var now = new Date()
		var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
		var formatter = new Intl.DateTimeFormat('en-US', options)
		var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`

		await context.env.MetaDB.prepare('INSERT INTO pool (id, op, name, content) VALUES (?, ?, ?, ?)').bind(id, '0', body.name, body.content).first()
		await context.env.MetaDB.prepare('UPDATE root set data=data+1 where name="comment"').first()

		r.success = true
		r.msg = {add: id}
	}

	// 读取留言数据
	if (m == "2") {
		r = await context.env.MetaDB.prepare('SELECT * FROM pool ORDER BY id DESC LIMIT ?, 5').bind(body.page).all()
		r.msg = {page: body.page}
	}

	// 获取留言总数
	if (m == "3") {
		r = await context.env.MetaDB.prepare('SELECT * from root where name="comment"').all()
		r.msg = null
	}



	return Response.json(r)
}


