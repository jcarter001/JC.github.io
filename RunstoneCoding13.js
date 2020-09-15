<html>
<body>
  <h1 id="hello">Hello World</h1>
     <button onclick="changeThisPageFunc();">Click Me!</button>
      <script type="text/javascript">
         changeThisPageFunc = function() {
            document.body.style.backgroundColor = "lightblue";
            document.body.text= "red";
            document.body.innerHTML = "<h1>So Long 130</h1>";
         }
      </script>
</body>
</html>
