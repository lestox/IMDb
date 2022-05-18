<?php

class CookieHelper
{
    public static function setCookie(string $token, string $username): void
    {
        setcookie('imdb_token', $token, time() + (3600 * 24 * 365), '/', 'localhost', false, false);
        setcookie('imdb_username', $username, time() + (3600 * 24 * 365), '/', 'localhost', false, false);
    }
}
