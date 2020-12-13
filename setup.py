"""Setup script to install HomeControl as a package"""

from setuptools import setup, find_namespace_packages

setup(
    name="homecontrol_frontend",
    version="20201213.1",
    url="https://github.com/lennart-k/HomeControl-Frontend",
    author="Lennart K",
    description="The frontend for HomeControl",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    packages=find_namespace_packages(
        include=("homecontrol_frontend", "homecontrol_frontend.*")),
    include_package_data=True,
    package_data={
        "": ["*"]
    },
    license="MIT",
    keywords="homecontrol home automation vuejs javascript",
    project_urls={
        "GitHub": "https://github.com/lennart-k/HomeControl-Frontend"
    }
)
