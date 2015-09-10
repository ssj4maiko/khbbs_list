var sortedAbilities = [];
for(var i = 0; i<abilities.length; ++i){
	sortedAbilities.push(abilities[i].name); 
}
sortedAbilities.sort();


function getAbilityValue(name){
	for(var i = 0;i<abilities.length;++i){
		if(name == abilities[i].name)
			return i;
	}
	//alert("ERROR!");
}

var sel = document.getElementById('select-ability');
for(var i=0;i<sortedAbilities.length;++i){
	var opt = document.createElement('option');
	opt.value = getAbilityValue(sortedAbilities[i]);
	opt.textContent = sortedAbilities[i];

	sel.appendChild(opt);
}

sel.addEventListener('change',findAbility);

function getCommandValue(name){
	for(var i = 0;i<command.length;++i){
		if(name == command[i].commandType +' - '+ command[i].name)
			return i;
	}
	//alert("ERROR!");
}

function updateCommandsSelect(){
	var sortedCommands = [];
	var aqua = !!document.getElementById('result-aqua').checked;
	var terra = !!document.getElementById('result-terra').checked;
	var ventus = !!document.getElementById('result-ventus').checked;

	for(var i = 0; i<command.length; ++i){
		sortedCommands.push(command[i].commandType +' - '+ command[i].name); 
	}
	sortedCommands.sort();



	var sel = document.getElementById('select-result');
	for(var i=0;i<sortedCommands.length;++i){
		var opt = document.createElement('option');
		opt.value = getCommandValue(sortedCommands[i]);
		opt.textContent = sortedCommands[i];

		sel.appendChild(opt);
	}
	sel.addEventListener('change',findResults);
	return true;
}
updateCommandsSelect();

/*
document.getElementById('result-aqua').addEventListener('change',updateCommandsSelect);
document.getElementById('result-terra').addEventListener('change',updateCommandsSelect);
document.getElementById('result-ventus').addEventListener('change',updateCommandsSelect);
*/



function getCommandName(id){
	//alert(id + ' typeof: '+typeof id);
	if(typeof id == 'number')
		return command[id].name;
	return id;
}
function getCharacters(){
	return {
		A:!!document.getElementById('result-aqua').checked,
		T:!!document.getElementById('result-terra').checked,
		V:!!document.getElementById('result-ventus').checked
	}
}
function testCharacters(el,chars){
	return ((chars.A == el.char_aqua && el.char_aqua) || 
			(chars.T == el.char_terra && el.char_terra) || 
			(chars.V == el.char_ventus && el.char_ventus))
}

function findAbility(e){
	var leTypes = [];
	var Material = '';
	for(var i in types){
		for(var j = 0;j<types[i].length;++j){
			if(types[i][j].ability == e.target.value){
				leTypes.push(i);
				Material = types[i][j].material;
				break;
			}
		}
	}
	Material += ' Crystal';
	var chars = getCharacters();
	var results = meld.filter(function(el,idx,arr){
		var res = false;
		if(testCharacters(el,chars))
			res = leTypes.indexOf(el.type) >= 0;
		return res;
	});
	divResult = document.getElementById('ability-results');
	divResult.textContent = '';


	for(var i = 0; i<results.length ; ++i){
		var item = document.createElement('p');
		item.textContent = getCommandName(results[i].result)+ ' = '+getCommandName(results[i].first) + ' + ' + getCommandName(results[i].second) + ' + ' + Material;
		divResult.appendChild(item);
	}
}
function findResults(e){
	var chars = getCharacters();
	var commandId = e.target.value;
	var results = meld.filter(function(el,idx,arr){
		var res = false;
		//alert(el.result + ' == ' + commandId)
		if(el.result == commandId){
			res = testCharacters(el,chars);
		}
		return res;
	});
	divResult = document.getElementById('ability-results');
	divResult.textContent = '';


	for(var i = 0; i<results.length ; ++i){
		var item = document.createElement('p');
		item.textContent = getCommandName(results[i].result)+ ' = '+getCommandName(results[i].first) + ' + ' + getCommandName(results[i].second);
		divResult.appendChild(item);
	}
}

