import { writable } from "svelte/store";

// const MemoStore = writable({
// 	"22b04e32-8263-43ec-91e3-396f6292f337": {
// 		title: "Project due",
// 		date: "",
// 		time: "",
// 		notes: ""
// 	}
// });

// Offline cache/storage of user's memos

if (localStorage.memos == undefined) {
	localStorage.memos = "{}";
	// localStorage.memos ='{\n\
	// 	"22b04e32-8263-43ec-91e3-396f6292f337": {\n\
	// 		"notes": "362: Presentation",\n\
	// 		"year": 2023,\n\
	// 		"month": 4,\n\
	// 		"day": 4,\n\
	// 		"timeH": 13,\n\
	// 		"timeM": 0\n\
	// 	}\
	// }'
}

console.log(localStorage.memos)

let initMemos: Object;
try {
	initMemos = JSON.parse(localStorage.memos);
} catch (err) {
	console.error(err);
	console.log("Error trying to load localStorage.memos, reinitializing...");
	initMemos = {};
	localStorage.memos = JSON.stringify(initMemos);
}

const memoStore = writable(initMemos)

// so we save to localStorage on every update
memoStore.subscribe((val) => localStorage.memos = JSON.stringify(val))

export default {
	subscribe: (cb) => memoStore.subscribe(cb),
	set: (id, memo) => {
		memoStore.update((val) => {
			val[id] = memo;
			return val;
		})
	}
};