<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ChackAccessTime
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $now = Carbon::now();
        $start = Carbon::createFromTime(7, 0);
        $end = Carbon::createFromTime(10, 0);

        // Ngoài giờ truy cập! Vui lòng quay lại từ 7h đến 10h
        if (!$now->between($start, $end)) {
            return response("Ngoài giờ truy cập! Vui lòng quay lại từ 7h đến 10h", 403);
        }

        return $next($request);
    }
}
