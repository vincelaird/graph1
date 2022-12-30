import { BigInt } from "@graphprotocol/graph-ts"
import {
  GravatarRegistry,
  NewGravatar,
  UpdatedGravatar
} from "../generated/Gravity/GravatarRegistry"
import { Gravatar } from "../generated/schema"

export function handleNewGravatar(event: NewGravatar): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand

  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  // }

  // BigInt and BigDecimal math are supported

  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters

  // entity.id = event.params.id
  // entity.owner = event.params.owner

  // Entities can be written to the store with `.save()`

  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getGravatar(...)
  // - contract.gravatars(...)
  // - contract.gravatarToOwner(...)
  // - contract.ownerToGravatar(...)

  // Use id field from emitted event as unique id for the entity
  const id = event.params.id.toHex();

  // Create a new Gravatar Entity with unique id
  const gravatar = new Gravatar(id);

  // Set Gravatar Entity fields
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;

  // Save entity to store
  gravatar.save();

}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  // Use proper id to load an entity from store
  const id = event.params.id.toHex();

  // Load the entity to be updated
  let gravatar = Gravatar.load(id);

  // Create the entity if it doesn't already exist
  if (!gravatar) {
    gravatar = new Gravatar(id);
  }

  // Set updated fields to entity
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;

  // Save updated entity to store
  gravatar.save();  
}
