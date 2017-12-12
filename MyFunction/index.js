exports.myFunction = function (req, res) 
{ 
	let name = req.body.name; 
	let content = "Your name is " + name; 
	res.status(200).send(content);
}