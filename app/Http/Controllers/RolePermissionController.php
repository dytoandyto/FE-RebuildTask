<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::where('name', '!=', 'manage-platform')
            ->get()
            ->map(function($p) {
                
                $category = 'Other';
                
                if (str_contains($p->name, 'company')) $category = 'Company';
                elseif (str_contains($p->name, 'workspaces') || str_contains($p->name, 'view')) $category = 'Workspaces';
                
                return [
                    'id'       => $p->id,
                    'name'     => $p->name,
                    'category' => $category,
                ];
            })->groupBy('category');

        $companies = Company::with('owner')->get();

        $ownerRole = Role::where('name', 'owner')->first();
        $ownerPermissions = $ownerRole ? $ownerRole->permissions->pluck('name')->toArray() : [];

        return Inertia::render('permissions/index', [
            'companies'          => $companies,
            'groupedPermissions' => $permissions,
            'rolePermissions'    => $ownerPermissions,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'permission_name' => 'required|exists:permissions,name',
            'enabled'         => 'required|boolean',
        ]);

        $role = Role::findByName('owner');
        
        if ($request->enabled) {
            $role->givePermissionTo($request->permission_name);
        } else {
            $role->revokePermissionTo($request->permission_name);
        }

        return back();
    }
}