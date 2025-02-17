"use client"
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Github, Sparkles, Twitter } from 'lucide-react';
import { motion } from "framer-motion";

export default function Footer() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        // Handle newsletter submission
        console.log(data);
        reset();
    };

    const links = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Documentation', href: '/docs' },
            { name: 'Examples', href: '/examples' },
            { name: 'Pricing', href: '/pricing' },
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
            { name: 'License', href: '/license' },
        ],
    };

    return (
        <footer className=" bg-white dark:bg-black">
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} TweetDigest. All rights reserved.
                    </p>
                </div>
        </footer>
    );
}
