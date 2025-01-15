export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}

	// 只读
	if (m == 0) {
		r = await context.env.MetaDB.prepare('SELECT * from root where name="visits"').all()
	}

	// 读写
	if (m == 1) {
		await context.env.MetaDB.prepare('UPDATE root set data=data+1 where name="visits"').first()
		r = await context.env.MetaDB.prepare('SELECT * from root where name="visits"').all()
	}



	return Response.json(r)
}