import {NextPage} from "next";

export type TypeRoles = {
    withAuth?: boolean;
    withAdmin?: boolean;
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles;

export type TypeComponentAuthField = {Component: TypeRoles};