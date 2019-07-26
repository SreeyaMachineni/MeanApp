import { PointOfContact } from '../hospital';
import { Package } from './package';

export class Insurer {
    name:String
    location:String
    address:String
    pointOfContact:PointOfContact
    package:Package
}
