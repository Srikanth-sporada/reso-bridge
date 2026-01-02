import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import Loading from '../components/Loading';



const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        // Fetch courses from Supabase
        const fetchCourses = async () => {
            const { data, error } = await supabase
                .from('courses')
                .select('*');

            if (error) {
                console.error('Error fetching courses:', error);
            } else {
                setCourses(data || []);
            }
            setLoading(false);
        };

        fetchCourses();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <nav className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">LMS Portal</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <User className="h-5 w-5 mr-2" />
                                <span>{user?.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Available Courses</h1>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loading />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 border border-transparent dark:border-gray-700">
                                    <div className={`h-2 bg-gradient-to-r ${course.color} to-white dark:to-gray-800`}></div>
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{course.title}</h3>
                                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            <p>{course.description}</p>
                                        </div>
                                        <div className="mt-4">
                                            <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium">
                                                Start Course &rarr;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
