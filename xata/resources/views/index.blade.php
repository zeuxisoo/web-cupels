<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>Xata - Cupels</title>
<link href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en" rel="stylesheet">
<link rel="stylesheet" href="{{ elixir('main.css') }}">
</head>
<body>
<div id="app"></div>
<script src="{{ elixir('main.js') }}"></script>

@if ( Config::get('app.debug') )
    <script type="text/javascript">
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
    </script>
@endif
</body>
</html>
