<?php

namespace App\Actions\Fortify;

use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        Validator::make($input, [
            'name'         => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email'        => 'required|string|email|max:255|unique:' . User::class,
            'password'     => $this->passwordRules()
        ])->validate();

        $user = User::create([
            'name'                      => $input['name'],
            'email'                     => $input['email'],
            'password'                  => Hash::make($input['password']),
            'email_verified_at'         => now(),
            'two_factor_confirmed_at'   => null,
            'two_factor_recovery_codes' => null,
            'two_factor_secret'         => null
        ]);

        $company = Company::create([
            'name'     => $input['company_name'],
            'owner_id' => $user->id
        ]);

        $user->company_id = $company->id;
        $user->save();
        $user->assignRole('owner');

        return $user;
    }
}