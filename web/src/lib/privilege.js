import { PRIVILEGE } from '../constants'

const privilege = {
    hasActivity: (privileges=[]) => (
        privileges.includes(PRIVILEGE.ACTIVITY_LOCK_ACCESS) ||
        privileges.includes(PRIVILEGE.ACTIVITY_LOCK_OPERATION) ||
        privileges.includes(PRIVILEGE.ACTIVITY_SYSTEM)
    ),
    hasActivityLockAccess: (privileges=[]) => (
        privileges.includes(PRIVILEGE.ACTIVITY_LOCK_ACCESS)
    ),
    hasActivityLockOperation: (privileges=[]) => (
        privileges.includes(PRIVILEGE.ACTIVITY_LOCK_OPERATION)
    ),
    hasActivitySystem: (privileges=[]) => (
        privileges.includes(PRIVILEGE.ACTIVITY_SYSTEM)
    ),
    hasAccessResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_ACCESS_RESOURCES)
    ),
    hasGetAccessResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_ACCESS_RESOURCES)
    ),
    hasCreateAccessResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.CREATE_ACCESS_RESOURCES)
    ),
    hasProgramAccessResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.PROGRAM_ACCESS_RESOURCES)
    ),
    hasManagementResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES)
    ),
    hasGetManagementResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_MANAGEMENT_RESOURCES)
    ),
    hasCreateManagementResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.CREATE_MANAGEMENT_RESOURCES)
    ),
    hasProgramManagementResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES)
    ),
    hasUser: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_USER) ||
        privileges.includes(PRIVILEGE.CREATE_USER)
    ),
    hasGetUser: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_USER)
    ),
    hasCreateUser: (privileges=[]) => (
        privileges.includes(PRIVILEGE.CREATE_USER)
    ),
    hasSystem: (privileges=[]) => (
        privileges.includes(PRIVILEGE.SYSTEM_CONFIG)
    ),
    hasLocationScope: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_USER) ||
        privileges.includes(PRIVILEGE.CREATE_USER) ||
        privileges.includes(PRIVILEGE.GET_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.GET_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES)
    ),
    hasAccessProfile: (privileges=[]) => (
        privileges.includes(PRIVILEGE.CREATE_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES)
    ),
    hasHardware: (privileges=[]) => (
        privileges.includes(PRIVILEGE.GET_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.GET_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_MANAGEMENT_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES)
    ),
    hasCreateResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.CREATE_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.CREATE_MANAGEMENT_RESOURCES)
    ),
    hasProgramResources: (privileges=[]) => (
        privileges.includes(PRIVILEGE.PROGRAM_ACCESS_RESOURCES) ||
        privileges.includes(PRIVILEGE.PROGRAM_MANAGEMENT_RESOURCES)
    ),
}

export default privilege