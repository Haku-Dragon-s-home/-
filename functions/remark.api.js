export async function onRequest(context) {
	var mod = context.request.headers.get('Token')

	var reData = {success: false, meta: {}, results: []}
	reData.msg = 'Invalid Input'
	if (mod == null) {
		return Response.json(reData)
	}

	var cont = await context.request.json()

	// 删除留言
	if (mod == "0") {
		await context.env.MetaDB.prepare('DELETE FROM comment WHERE deletable = 1 and id = ?').bind(cont.id).first()
		await context.env.MetaDB.prepare('UPDATE root set content = content - 1 where data="comment"').first()

		reData.msg = 'delete: ' + id
	}

	// 添加留言
	if (mod == "1") {
		if (cont.content.length > 200 || cont.name.length > 20) {
			return Response.json(reData)
		}

		// 生成一个 id
		var now = new Date()
		var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
		var formatter = new Intl.DateTimeFormat('en-US', options)
		var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`

		await context.env.MetaDB.prepare('INSERT INTO comment (id, deletable, name, content) VALUES (?, ?, ?, ?)').bind(id, '1', cont.name, cont.content).first()
		await context.env.MetaDB.prepare('UPDATE root set content = content + 1 where data="comment"').first()
	
		reData.msg = 'add: ' + id
	}

	// 读取留言数据
	if (mod == "2") {
		reData = await context.env.MetaDB.prepare('SELECT * FROM comment ORDER BY id DESC LIMIT ?, 5').bind(cont.page).all()
		reData.msg = 'page: ' + cont.page
	}

	// 获取留言总数
	if (mod == "3") {
		reData = await context.env.MetaDB.prepare('SELECT * from root where data="comment"').all()
		reData.msg = null
	}



	return Response.json(reData)
}


