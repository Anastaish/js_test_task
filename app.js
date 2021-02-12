const fs = require("fs");

const FILE_ENCODING = "utf8";
const INPUT_FILENAME = "input.txt";
const OUTPUT_FILENAME = "output.txt";

function get_text_of(message) {
	var message_parts = message.split(": ");
	if (message_parts && message_parts.length > 1) return message_parts[1];
}

function get_users_of(message) {
	var message_parts = message.split(": ");
	if (message_parts && message_parts.length > 1) return message_parts[0];
}

function get_root_user_of(message) {
	var message_users_array = get_users_of(message).split(":");
	return message_users_array[message_users_array.length - 1];
}

function is_root(message) {
	var message_users = get_users_of(message);
	return message_users && message_users.split(":").length - 1 === 0;
}

function apply_tabulation_for(message) {
	var message_users_number = get_users_of(message).split(":").length;
	var message_last_user = get_users_of(message).split(":")[0];
	return "  ".repeat(message_users_number - 1) + "|-" + message_last_user + ": " + get_text_of(message);
}

var root_messages = [];
var sub_messages = [];
var messages = [];

try {
	messages = fs.readFileSync(INPUT_FILENAME, FILE_ENCODING).toString().split("\n");
} catch(e) {
	console.log('Error reading messages: ', e.stack);
	return;
}

for (index in messages) {
	if (is_root(messages[index])) {
		root_messages.push(messages[index]);
	} else {
		sub_messages.push(messages[index]);
	}
}

messages = []

for (root_index in root_messages) {
	messages.push(root_messages[root_index])
	var root_message_user = get_users_of(root_messages[root_index]);
	for (sub_index in sub_messages) {
		if (sub_messages[sub_index] != "" && get_root_user_of(sub_messages[sub_index]) === root_message_user) {
			messages.push(apply_tabulation_for(sub_messages[sub_index]));
			sub_messages[sub_index] = "";
		}
	}
}

var stream = fs.createWriteStream(OUTPUT_FILENAME);
stream.once('open', function(fd) {
	for (index in messages) {
        stream.write(messages[index] + "\n");
	}
	stream.end();
});
