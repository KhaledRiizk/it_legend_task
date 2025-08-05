import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrump = () => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 py-4 px-6 bg-muted/50 rounded-lg border"
    >
      <Breadcrumb>
        <BreadcrumbList className="text-md">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Courses
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-semibold">
              Course Details
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default BreadCrump;
