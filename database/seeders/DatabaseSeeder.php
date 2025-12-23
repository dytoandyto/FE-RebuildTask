<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage-platform',
            'manage-company',
            'view-analytics',
            'view-workspaces',
            'create-workspaces',
            'edit-workspaces',
            'delete-workspaces',
        ];

        foreach ($permissions as $p) {
            Permission::create(['name' => $p]);
        }

        $superAdminRole = Role::create(['name' => 'super-admin']);
        $superAdminRole->givePermissionTo('manage-platform');

        $ownerRole = Role::create(['name' => 'owner']);
        $ownerRole->givePermissionTo([
            'manage-company', 'view-analytics', 'view-workspaces',
            'create-workspaces', 'edit-workspaces', 'delete-workspaces'
        ]);

        $superAdmin = User::create([
            'company_id'        => null,
            'name'              => 'Super Admin',
            'email'             => 'superadmin@localhost.com',
            'password'          => Hash::make('password'),
            'email_verified_at' => now(),
            'two_factor_confirmed_at'   => null,
            'two_factor_recovery_codes' => null,
            'two_factor_secret'         => null,
        ]);
        $superAdmin->assignRole($superAdminRole);
    }
}