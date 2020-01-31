#INSTRUCTION
1. Open front and backend
2. run npm install to both of them
3. again open backend and do NPM START 






webRTC somehow hs to do something with signaling

read about webRTC Signaling:

clients cannot now the public IP address in order a connection to be establish
resolve using STUN.

TURN acts as a relay server

Read About:
	TURN
	STUN
	Adapter.js


navigator.getUserMedia() - grants you access to a device // avoid using this, and is deprecated

//much better
navigator


Ngrok For HTTPS

without SIGNALING SERVER
	*create local SDP
	*paste local SDP to remote SDP and hit setDesc
	*in the RemoteSDP click "Answer" and anothr SDP will pop up 
	copy the new SDP and paste it to the local and now on the local machine
	* Remote will accept sdp
	and from the icecandidate json 
	copy it 
	