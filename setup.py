#!/usr/bin/env python
"""The setup script."""
import os

from setuptools import find_packages, setup

with open('README.md') as readme_file:
    readme = readme_file.read()

VERSION = "0.1.0"


def load_requirements(f):
    return list(
        filter(None,
               [l.split("#", 1)[0].strip() for l in open(os.path.join(os.getcwd(), f)).readlines()]))


setup(
    author="Yusuke Kitamura",
    author_email='ymyk6602@gmail.com',
    python_requires='>=3.6',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
    ],
    description="Analyze stock market",
    install_requires=load_requirements("requirements.txt"),
    license="MIT license",
    long_description=readme,
    keywords='stock',
    name='stock',
    packages=find_packages(include=['stock', 'stock.*']),
    package_data={'stock': ['cert/stockdata-332410-704571e36294.json']},
    test_suite='tests',
    tests_require=load_requirements("requirements_dev.txt"),
    url='https://github.com/y-kitamu/stock',
    version=VERSION,
    zip_safe=False,
)
