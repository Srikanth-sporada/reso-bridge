
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const VerifyEmail = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                        <Mail className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
                    <p className="text-gray-600 mb-6">
                        We've sent a verification link to your email address. Please click the link to verify your account.
                    </p>
                    <div className="text-sm">
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
