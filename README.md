# nodejs-string-vs-buffer
V8 Strings vs Binary Buffers

´´´
git clone https://github.com/krystianity/nodejs-string-vs-buffer.git
cd nodejs-string-vs-buffer
npm install
npm start
´´´

´´´javascript
includes/templates length is: 100
 === ONE SHOT ===
string templating time: 46.499 micros.
buffer (unsafe) templating time: 379.657 micros.
buffer templating time: 216.143 micros.
buffer (reuse) templating time: 85.078 micros.
 === LOOPS ===
loop string templating time: 28491.095 micros.
loop buffer (unsafe) templating time: 594279.093 micros.
loop buffer templating time: 607702.222 micros.
loop buffer (reuse) templating time: 547666.684 micros.
´´´

Strings are built-in to V8, and allocate memory within the VM. Buffers were added not to make all string operations faster, but to represent binary data, where as Strings are unicode.
When writing large amounts of data to a socket, it's much more efficient to have that data in binary format, vs having to convert from unicode.
So for common operations, like concat, I'm not surprised Strings are faster.
-- <cite>cloudhead(StackOverflow)</cite>