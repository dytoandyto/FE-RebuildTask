<?php

use App\Http\Controllers\RolePermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('workspaces', function () {
        return Inertia::render('workspaces/workspaces');
    })->name('workspaces');
    Route::get('workspaces/{id}', function ($id) {
        return Inertia::render('workspaces/workspaces-detail', [
            'id' => $id
        ]);
    })->name('workspaces.show');

    Route::get('projects', function () {
        return Inertia::render('projects/projects');
    })->name('projects');
    Route::get('projects/{id}', function ($id) {
        return Inertia::render('projects/projects-detail', [
            'id' => $id
        ]);
    })->name('projects.show');

    Route::get('tasks', function () {
        return Inertia::render('tasks');
    })->name('tasks');
    Route::get('teams', function () {
        return Inertia::render('teams');
    })->name('teams');
    Route::get('bugs', function () {
        return Inertia::render('bugs');
    })->name('bugs');
    Route::get('timesheets', function () {
        return Inertia::render('timesheets');
    })->name('timesheets');
    Route::get('reports', function () {
        return Inertia::render('reports');
    })->name('reports');
    Route::get('invoices', function () {
        return Inertia::render('invoices');
    })->name('invoices');

    Route::get('task-members', function () {
        return Inertia::render('task-members');
    })->name('task-members');
    Route::get('timesheet-members', function () {
        return Inertia::render('timesheet-members');
    })->name('timesheet-members');
});

Route::middleware(['auth', 'role:super-admin'])->group(function () {

    Route::get('/permissions', [RolePermissionController::class, 'index'])->name('permissions.index');
    Route::post('/permissions/toggle', [RolePermissionController::class, 'update'])->name('permissions.toggle');
});
require __DIR__ . '/settings.php';
